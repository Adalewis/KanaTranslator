import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//Subject is event emitter
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Post } from "./post.model";

//instead of placing PostsService in providers of app.module @ngModule
//use @Injectable so PostsService is available from the root
@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
//Subject passess list of posts
  private postsUpdated = new Subject<Post[]>();

//injecting httpclient and binded as private property
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
//get body of response
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      //actions to handle data before they get to subscribe,
      //add in operator through pipe()
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post.id
          };
        });
      }))
      //given by rxjs, when there is a change that is observed
      //subscribe method gets called
      .subscribe(convertedPosts => {
        this.posts = convertedPosts;
//new array created with spread operator
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http

      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        const id = responseData.postId;
        //updates null value of Post id to the id sent
        post.id = id;
        this.posts.push(post);
        //actively updates frontend when posts are added
        this.postsUpdated.next([...this.posts]);
      });
  }

//post-list.component's onDelete method sends request to deletePost which updates angular frontend via filter
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/"+postId)
      .subscribe(() => {
        //actively updates view of frontend after delete
        //filter() returns subset that is true where postId
        const updatedPosts = this.posts.filter(post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        })
        console.log("deleted");

  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import * as _ from "lodash";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {
  comments: any;
  offset = 2;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;

  public anuncios: Observable<any[]>;

  constructor(public ps: PostsService) {
    
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.ps.more()
    }
  }

  ngOnInit() {
    this.ps.init('posts', 'data', { reverse: true, prepend: false })
  }

}
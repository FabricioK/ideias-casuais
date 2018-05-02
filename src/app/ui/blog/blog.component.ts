import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  public anuncios: Observable<any[]>;

  constructor(db: AngularFirestore,ps : PostsService) {
    db.firestore.settings({ timestampsInSnapshots: true });
    this.anuncios = ps.getPosts(1,1);
  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }
  
  ngOnInit() {
  }

}
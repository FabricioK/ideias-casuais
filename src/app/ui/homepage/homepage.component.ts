import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Image {
  criadoem: number,
  imgsrc: string,
  uid: string
}

export interface Post {
  content: string,
  criadoem: 1501103235402,
  imagens: Image,
  style: string,
  subtitle: string,
  tag: string,
  title: string,
  uid: string,
  user: any,
  since: number
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public anuncios: Observable<any[]>;
  public itens: AngularFirestoreCollection<Post>;
  constructor(db: AngularFirestore) {   
    this.itens = db.collection<Post>('/posts');
    this.anuncios = this.itens.valueChanges().map(posts => {
      posts.map(p => {
        p.user = db.doc('/user/' + p.uid);
        p.since = 0; // this.getDateTimeSince(p.criadoem);
      });
      return posts;
    });
  }
  

  ngOnInit() {
  }

}

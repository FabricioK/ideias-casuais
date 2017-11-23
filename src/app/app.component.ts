import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
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
    console.log(this.anuncios)
  }
}

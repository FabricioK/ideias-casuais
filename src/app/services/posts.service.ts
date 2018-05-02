import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Image {
  criadoem: number,
  imgsrc: string,
  uid: string
}

interface Post {
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
@Injectable()
export class PostsService {
  public itens: AngularFirestoreCollection<Post>;
  public anuncios: Observable<any[]>;

  constructor(public db : AngularFirestore) { }

  getPosts(offset, startKey?): Observable<any> {
    this.itens = this.db.collection<Post>('/posts', ref => ref.where('startAt', '==', startKey).limit(offset));
    return this.anuncios = this.itens.valueChanges().map(posts => {
      posts.map(p => {
        p.user = this.db.doc('/user/' + p.uid);
        p.since = 0; // this.getDateTimeSince(p.criadoem);
      });
      return posts;
    });
    }
}

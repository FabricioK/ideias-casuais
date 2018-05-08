import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QueryConfig } from 'firebase/firestore'

import { BehaviorSubject, Observable } from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { OrderByDirection } from '@firebase/firestore-types';


export interface QueryConfig {
  path: string;
  field: string;
  limit: number;
  reverse: boolean;
  // prepend: boolean;
  // direction: string;
}
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
  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  private lastCursor: any[];
  constructor(private afs: AngularFirestore) {

  }

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {
    this.query = {
      path,
      field,
      limit: 2,
      reverse: false,
      prepend: false,
      ...opts
    }

    const first = this.afs.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, 'asc')
        .limit(this.query.limit)
    })

    this.mapAndUpdate(first)

    // Create the observable array for consumption in components

    this.data = this._data.asObservable()
      .scan((acc, val) => {

        if (acc.length > 0 && val.length == 0)
          return acc;
          
        return acc = val
      });
  }

  add(title: string, content: string) {
    const id = this.afs.createId();
    const post: Post = {
      content: content,
      criadoem: 1501103235402,
      imagens: null,
      style: "",
      subtitle: "string",
      tag: "string",
      title: title,
      uid: "string",
      user: "any",
      since: 1
    };
    this.afs.collection(this.query.path).doc(id).set(post);
  }
  // Retrieves additional data from firestore
  next() {
    const cursor = this.getCursor(true)

    if (cursor) {
      const more = this.afs.collection(this.query.path, ref => {
        return ref
          .orderBy(this.query.field, 'asc')
          .limit(this.query.limit)
          .startAfter(cursor)
      })
      this.mapAndUpdate(more)
    }
  }

  // Retrieves additional data from firestore
  before() {
    const cursor = this.getCursor(false)
    if (cursor) {
      const more = this.afs.collection(this.query.path, ref => {
        return ref
          .orderBy(this.query.field, 'desc')
          .limit(this.query.limit)
          .startAfter(cursor)
      })
      this.mapAndUpdate(more)
    }
  }
  // Determines the doc snapshot to paginate query 
  private getCursor(asc: boolean) {
    const current = this._data.value
    if (current.length) {
      return current[0].doc
    }
    return null;
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) { return };

    // loading
    this._loading.next(true)

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })
        values.sort((a: any, b: any) => {
          return a.data.getTime() - b.data.getTime();

        });
        // update source with new values, done loading
        if (values)
          this._data.next(values);

        this._loading.next(false)

        // no more values, mark done
        if (!values.length) {
          this._done.next(true)
        }
      })
      .take(1)
      .subscribe()

  }
}

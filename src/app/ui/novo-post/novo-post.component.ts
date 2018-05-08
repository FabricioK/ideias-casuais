import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-novo-post',
  templateUrl: './novo-post.component.html',
  styleUrls: ['./novo-post.component.scss']
})
export class NovoPostComponent implements OnInit {
  public htmlTitle;
  public htmlContent;
  constructor(public ps: PostsService,private router: Router) { }

  ngOnInit() {
    this.ps.init('posts', 'data', { reverse: true, prepend: false })
  }
  
  save() {
    this.ps.add(this.htmlTitle, this.htmlContent);
  }
}

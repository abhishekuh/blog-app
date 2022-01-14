import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  public blog : any
  public comments : any
  public blogID : String

  addCommentForm = new FormGroup({
    comment: new FormControl('',Validators.required,)
  });

  constructor(private blogService:BlogService,private route:ActivatedRoute,private router: Router) {
    this.blogID = this.route.snapshot.params['id'];
    this.getBlogData()
   }

  ngOnInit(): void {
  } 

  getBlogData(){
    this.blogService.getBlogDetail(this.blogID).subscribe(res => {
      this.blog = res
    })

    this.blogService.getBlogComments(this.blogID).subscribe(res => {
      this.comments = res
    })
  }

  onSubmit() {
    if(this.addCommentForm.value.comment === ''){
      alert('You cannot post a blank comment !')
      return
    }
    else{
    const data = {
      'date': new Date(),
      'content': this.addCommentForm.value.comment,
      'user': 'Current User'
    }
    this.blogService.saveComment(data,this.blogID).subscribe(res => {
      this.getBlogData()
    }
      , err => {
        console.log(err)
        alert(err)
      })
    }
  }

}

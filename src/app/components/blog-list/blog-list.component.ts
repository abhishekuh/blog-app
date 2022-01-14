import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogs : any
  apiData : any = []

  constructor(private blogService:BlogService) {}

  ngOnInit(): void {
    this.getAllBlogs()
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(res => {
      this.apiData = res
      this.blogs = this.apiData.sort((a:any, b:any) => a.date - b.date).reverse();
    })
  }

}

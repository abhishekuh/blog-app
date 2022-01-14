import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailComponent } from './blog-detail.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { of } from 'rxjs';
import { Blog } from 'src/app/blog.model';
import { HttpClient } from '@angular/common/http';

const expectedBlog : Blog[] = [
    {
      "id": 2,
      "title": "Blog post #2",
      "author": "Olene Ogan",
      "publish_date": "2016-03-16",
      "slug": "blog-post-2",
      "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
      "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p> <p>Dico omnesque epicurei te vix. Tota verterem temporibus eu quo, eu iudicabit repudiandae sea. Elitr nihil gloriatur vis in.</p>"
    }
  ];

describe('BlogDetailComponent', () => {
  let component: BlogDetailComponent;
  let fixture: ComponentFixture<BlogDetailComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let service: BlogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]),],
      declarations: [BlogDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BlogService(httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return expected blog by ID (HttpClient called once)', (done: DoneFn) => {

    httpClientSpy.get.and.returnValue(of(expectedBlog));

    service.getBlogDetail(2).subscribe(
      blogs => {
        expect(blogs).toEqual(expectedBlog, 'expected blog');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

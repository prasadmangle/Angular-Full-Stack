import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  exam = {};
  exams = [];
  isLoading = true;
  isEditing = false;

  addExamForm: FormGroup;
  name = new FormControl('', Validators.required);
  topic = new FormControl('', Validators.required);

  constructor(private examService: ExamService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getExams();
    this.addExamForm = this.formBuilder.group({
      name: this.name,
      topic: this.topic
    });
  }

  addExam() {
    this.examService.addExam(this.addExamForm.value).subscribe(
      res => {
        const newExam = res.json();
        this.exams.push(newExam);
        this.addExamForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  getExams() {
    this.examService.getExams().subscribe(
      data => this.exams = data,
      error => console.log(error),
      () => this.isLoading = false
    )
  }

  enableEditing(exam) {
    this.isEditing = true;
    this.exam = exam;
  }

  cancelEditing() {
    this.isEditing = false;
    this.exam = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getExams();
  }

  editExam(exam) {
    this.examService.editExam(exam).subscribe(
      res => {
        this.isEditing = false;
        this.exam = exam;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteExam(exam) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.examService.deleteExam(exam).subscribe(
        res => {
          const pos = this.exams.map(elem => elem._id).indexOf(exam._id);
          this.exams.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}


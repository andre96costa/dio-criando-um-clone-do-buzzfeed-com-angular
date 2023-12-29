import { Component } from '@angular/core';
import quizz_questions from "src/assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {
  title: string = '';
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answersSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;
  results:any



  ngOnInit(){
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length
      this.results = quizz_questions.results
    }
  }


  playerChoise(choise:string){
    this.answers.push(choise);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex++;
    console.log(this.questionIndex);
    console.log(this.questionMaxIndex);
    if (this.questionIndex == this.questionMaxIndex) {
      this.finished = true;
      this.answersSelected = await this.showResult();
      return;
    }

    this.questionSelected = this.questions[this.questionIndex];
  }

  async showResult(){
    const result = this.answers.reduce((previousValue, currentValue, index ,arr) => {
      if (arr.filter(item => item === previousValue).length > arr.filter(item => item === currentValue).length) {
        return previousValue;
      }else{
        return currentValue;
      }
    });
    return result;
  }

  recomecar(){
    window.location.reload();
  }

}

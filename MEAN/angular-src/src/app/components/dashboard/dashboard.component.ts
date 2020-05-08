import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  amount: Number;
  description: String;
  date: Date;
  expenses: Object;
  incomelist: Object;

  total_exp: number = 0;
  total_inc: number = 0;

  showMyContainer: boolean = false;

  showMyIncomeContainer: boolean = false;

  @Output() myEvent = new EventEmitter();

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';

  public doughnutChartLabelsIncome = [];
  public doughnutChartDataIncome = [];
  public doughnutChartTypeIncome = 'doughnut';

  public doughnutChartLabelsT = [];
  public doughnutChartDataT = [];
  public doughnutChartTypeT = 'doughnut';

  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.ListExpenses();
    this.ListIncome();
    this.updateTotal();
    this.updateIncomeTotal();
  }

  addExpense() {
    const data = {
      amount: this.amount,
      description: this.description,
      date: new Date(this.date),
    };

    this.dataService.addExpenseRequest(data).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.ListExpenses();
        this.updateIncomeTotal();
        this.showMyContainer = false;
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }

  ListExpenses() {
    this.dataService.getExpenses().subscribe(
      (data: any) => {
        this.expenses = data;
        this.updateTotal();
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  updateTotal() {
    var add: number = 0;
    for (let ex of this.expenses) {
      add += ex.amount;

      //console.log(this.doughnutChartLabels.includes(ex.description));

      if (!this.doughnutChartLabels.includes(ex.description)) {
        this.doughnutChartLabels.push(ex.description);
      }
      if (!this.doughnutChartData.includes(ex.amount)) {
        this.doughnutChartData.push(ex.amount);
      }
    }

    this.total_exp = add;
  }

  deleteExpense(expense) {
    const id = {
      _id: expense._id,
    };
    //console.log(id);
    this.dataService.deleteExpense(id).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.ListExpenses();
        this.updateTotal();
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }

  updateExpense(expense) {
    //console.log(id);
    this.dataService.updateExpense(expense).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.ListExpenses();
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }

  addIncome() {
    const data = {
      amount: this.amount,
      description: this.description,
      date: new Date(this.date),
    };
    //console.log(data);

    this.dataService.addIncomeRequest(data).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.ListIncome();
        this.updateIncomeTotal();
        this.showMyIncomeContainer = false;
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }

  ListIncome() {
    this.dataService.getIncome().subscribe(
      (data: any) => {
        this.incomelist = data;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  updateIncomeTotal() {
    var addin: number = 0;
    for (const i of this.incomelist) {
      addin += i.amount;
      if (!this.doughnutChartLabelsIncome.includes(i.description)) {
        this.doughnutChartLabelsIncome.push(i.description);
      }
      if (!this.doughnutChartDataIncome.includes(i.amount)) {
        this.doughnutChartDataIncome.push(i.amount);
      }
    }

    this.total_inc = addin;
  }

  deleteIncome(expense) {
    const id = {
      _id: expense._id,
    };
    //console.log(id);
    this.dataService.deleteIncome(id).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });
        this.ListIncome();
        this.updateIncomeTotal();

        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }

  updateIncome(expense) {
    //console.log(id);
    this.dataService.updateIncome(expense).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.ListIncome();
        this.updateIncomeTotal();
        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'dashboard']);
      }
    });
  }
}

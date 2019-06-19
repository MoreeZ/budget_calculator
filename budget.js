window.addEventListener('load', ()=> {
    const incomeAddSign = document.querySelector(".add-income i");
    const expenseAddSign = document.querySelector(".add-expense i");
    const incomeDesc = document.querySelector(".income-desc");
    const expenseDesc = document.querySelector(".expense-desc");
    const incomeAmount = document.querySelector(".income-amount");
    const expenseAmount = document.querySelector(".expense-amount");
    
    //global data
    let globalCounter = 0;//1++ every time a unique key and ID is created.
    let incomeData={};//All income Data
    let expenseData={};//All expense Data

    //EXPENSE CALCULATIONS =================================================================================
    //Refreshes the display list based on the contents of incomeData
    const incomeRefresh =()=>{
        const incomeList = document.querySelector(".income-list ul");
        //resets income list
        incomeList.innerHTML = "";
        //maps each output() from incomeData object onto the html list
        for(let each in incomeData){   
            incomeList.innerHTML += incomeData[each].output();
        }
        //resets the form fields
        incomeDesc.value = "";
        incomeAmount.value = "";
        //When bin icon is clicked it gets it's id and compares it to the name of a incomeData property and deletes it.
        let eachI = document.querySelectorAll(".income-list ul li i");
        eachI.forEach(i => {
            i.addEventListener('click', function(){
                let iID = this.id;
                delete incomeData[iID];
                incomeRefresh();
            });
        });
        document.querySelector(".income-output").innerHTML = sumUpIncome();
        document.querySelector(".budget-output").innerHTML = totalBudget();
    };
    //function for the three event listeners below
    function addIncomeEvent(){
        //checks if the form was filled out correctly
        if(incomeDesc.value !== "" && incomeAmount.value !== ""){
            //adds a unique property / sub-object to the incomeData object which stores the data of all incomes
            incomeData[globalCounter] = {
                desc: incomeDesc.value,
                amount: incomeAmount.value,
                num: globalCounter,
                output: function() {
                    return `<li><p class="one">${this.desc}</p><p class="two">€${this.amount}</p><i id="${this.num}"class="fas fa-trash-alt"></i></li>`
                }
            };
            //refreshes the list and adds 1 to the globalCounter which will create unique key names and delete icon ID's
            incomeRefresh();
            globalCounter++;
            //puts the focus back on the "Description" input
            document.querySelector(".income-desc").focus();
        }
    }
    //event listener for adding a new income when "+" is clicked AND when pressing enter.
    incomeAddSign.addEventListener('click', addIncomeEvent);
    incomeAmount.addEventListener('keydown', (e)=>{if (e.keyCode === 13){addIncomeEvent()}});
    incomeDesc.addEventListener('keydown', (e)=>{if (e.keyCode === 13){addIncomeEvent()}});

    //Gets the total of all incomes
    const sumUpIncome =()=>{
        let totalIncome=0;
        for(let each in incomeData){   
            totalIncome += Number(incomeData[each].amount);
        }
        return totalIncome;
    };

    //EXPENSE CALCULATIONS =================================================================================
    //Refreshes the display list based on the contents of expenseData
    const expenseRefresh = () => {
        const expenseList = document.querySelector(".expense-list ul");
        //resets expense list
        expenseList.innerHTML = "";
        //maps each output() from expenseData object onto the html list
        for(let each in expenseData){   
            expenseList.innerHTML += expenseData[each].output();
        }
        //resets the form fields
        expenseDesc.value = "";
        expenseAmount.value = "";
        //When bin icon is clicked it gets it's id and compares it to the name of a expenseData property and deletes it.
        let eachI = document.querySelectorAll(".expense-list ul li i");
        eachI.forEach(i => {
            i.addEventListener('click', function(){
                let iID = this.id;
                delete expenseData[iID];
                expenseRefresh();
            });
        });
        document.querySelector(".expense-output").innerHTML = sumUpExpense();
        document.querySelector(".budget-output").innerHTML = totalBudget();
    };
    
    function addExpenseEvent(){
        if(expenseDesc.value !== "" && expenseAmount.value !== ""){
            //adds a unique property / sub-object to the expenseData object which stores the data of all expenses
            expenseData[globalCounter] = {
                desc: expenseDesc.value,
                amount: expenseAmount.value,
                num: globalCounter,
                output: function() {
                    return `<li><p class="one">${this.desc}</p><p class="two">€${this.amount}</p><i id="${this.num}"class="fas fa-trash-alt"></i></li>`
                }
            };
            //refreshes the list and adds 1 to the globalCounter which will create unique key names and delete icon ID's
            expenseRefresh();
            globalCounter++;
            //puts the focus back on the "Description" input
            document.querySelector(".expense-desc").focus();
        }
    }
    //event listener for adding a new expense when "+" is clicked
    expenseAddSign.addEventListener('click', addExpenseEvent);
    expenseAmount.addEventListener('keydown', (e)=>{if (e.keyCode === 13){addExpenseEvent()}});
    expenseDesc.addEventListener('keydown', (e)=>{if (e.keyCode === 13){addExpenseEvent()}});
    // Gets the total of all expenses
    const sumUpExpense =()=>{
        let totalExpense=0;
        for(let each in expenseData){   
            totalExpense += Number(expenseData[each].amount);
        }
        return totalExpense;
    };
    
    //TOTAL BUDGET CALCULATIONS ==================================================================
    const totalBudget =()=>{
        let incomeValue = Number(document.querySelector(".income-output").innerHTML);
        let expenseValue = Number(document.querySelector(".expense-output").innerHTML);
        return incomeValue - expenseValue;
    }
    //end of on window load functions-----------------------------------------
});

//Additional function that forces numbers in "Amount" input
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

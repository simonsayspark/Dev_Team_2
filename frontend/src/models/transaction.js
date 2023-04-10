export class Transcation { 
    constructor(employee_id, company_id, order_date, amount_requested, category, claim_description){

        this.employee_id = employee_id;
        this.company_id = company_id; 
        this.order_date = order_date; 
        this.amount_requested = amount_requested; 
        this.category = category;
        this.claim_description= claim_description;
        
    }
}


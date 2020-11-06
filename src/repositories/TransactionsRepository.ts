import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce((acm: Balance, transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          acm.income += transaction.value
          break;
        case 'outcome':
          acm.outcome += transaction.value
          break
        default:
          break;
      }

      return acm;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    return {
      income,
      outcome,
      total: income - outcome
    }
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

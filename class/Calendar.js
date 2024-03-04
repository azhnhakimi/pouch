class Calendar {
	constructor() {
		this.totalAmount = 0;
		this.tagTotals = {
			food: 0,
			utilities: 0,
			transport: 0,
			personalCare: 0,
			entertainment: 0,
			savings: 0,
			miscellaneous: 0,
			clothing: 0,
			supplies: 0,
			subscriptions: 0,
		};
	}

	getData() {
		return {
			totalAmount: this.totalAmount,
			tagTotals: this.tagTotals,
		};
	}
}

export default Calendar;

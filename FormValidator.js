class FormValidator {
  constructor(form) {
    this.form = form;

    this.form.addEventListener('submit', this.onSubmit);

    this.summary = document.getElementById('error-summary');
  }

  showSummary() {
    this.summary.focus();
  }

  showSummaryPanel() {

  }

  showInlineErrors() {

  }

  validate() {
    return true;
  }

  onSubmit(event) {
    console.log('helllloo');
    event.preventDefault();
    if (!this.validate()) {
      event.preventDefault();
    //   this.showSummaryPanel();
    //   this.showInlineErrors();
    };
  }

  onErrorClick(event) {
    event.preventDefault();

    const href = event.target.href;
    const id = href.substring(href.indexOf('#'), href.length);

    document.getElementById(id).focus();
  }
}

const form = document.forms[0];
const validator = new FormValidator(form);

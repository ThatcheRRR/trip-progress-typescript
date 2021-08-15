const moment = require('moment');
import './styles/style.scss';

const fromInput = <HTMLInputElement>document.querySelector('#arrival');
const toInput = <HTMLInputElement>document.querySelector('#departure');
const submitBtn = <HTMLButtonElement>document.querySelector('.button');

submitBtn.addEventListener('click', () => {
    handleSubmit();
});

const handleSubmit = () => {

};

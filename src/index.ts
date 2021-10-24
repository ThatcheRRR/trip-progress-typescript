import './styles/style.scss';

const fromInput = <HTMLInputElement>document.querySelector('#arrival');
const toInput = <HTMLInputElement>document.querySelector('#departure');
const submitBtn = <HTMLButtonElement>document.querySelector('.button');
const progressAmount = <HTMLElement>document.querySelector('.progress__text');
let progress: number = 0;
let fromDate: number = 0;
let toDate: number = 0;

const getSavedProgress = (): void => {
    if (localStorage.getItem('data')) {
        const data = JSON.parse(localStorage.getItem('data'));
        fromDate = data.fromDate;
        toDate = data.toDate;
        calculateProgress();
    }
};

const handleSubmit = (): void => {
    fromDate = +new Date(fromInput.value);
    toDate = +new Date(toInput.value);
    const dataToSave = {
        fromDate,
        toDate,
    };
    calculateProgress();
    localStorage.setItem('data', JSON.stringify(dataToSave));
};

const calculateProgress = () => {
    setTimeout((): void => {
        progress = (+new Date() - fromDate) / (toDate - fromDate) * 100;
        if (progress >= 100) {
            progress = 100;
            progressAmount.textContent = `${progress.toFixed(2)}%`;
            clearTimeout();
        } else if (progress < 0) {
            progressAmount.textContent = `Waiting...`;
        } else {
            progressAmount.textContent = `${progress.toFixed(2)}%`;
            return calculateProgress();
        }
    }, 1000);
};

window.addEventListener('load', getSavedProgress);
submitBtn.addEventListener('click', handleSubmit);

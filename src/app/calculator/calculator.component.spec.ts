import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CalculatorComponent} from './calculator.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {min} from "rxjs/operators";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled;
  let addButton;
  let inp1;
  let inp2;
  let minusButton;
  let mulButton;
  let divButton;
  let resetButton;

  const byTestId = (id) => `[data-test-id="${id}"]`;

  const getByTestId = (id) => {
    return compiled.querySelector(byTestId(id));
  };

  const pushValue = (input, value) => {
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('change'));
    input.nativeElement.dispatchEvent(new Event('input'));
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule,
          ReactiveFormsModule
        ],
        declarations: [CalculatorComponent],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    addButton = fixture.debugElement.query(By.css(byTestId('add-button')));
    minusButton = fixture.debugElement.query(By.css(byTestId('minus-button')));
    mulButton = fixture.debugElement.query(By.css(byTestId('multiply-button')));
    divButton = fixture.debugElement.query(By.css(byTestId('divide-button')));
    resetButton = fixture.debugElement.query(By.css(byTestId('reset-button')));
    inp1 = fixture.debugElement.query(By.css(byTestId('app-input1')));
    inp2 = fixture.debugElement.query(By.css(byTestId('app-input2')));
    fixture.detectChanges();
  });

  it(`Initial UI is rendered as expected`, async () => {
    await fixture.whenStable();
    expect(inp1.nativeElement.textContent.trim()).toBeFalsy();
    expect(inp2.nativeElement.textContent.trim()).toBeFalsy();
    expect(getByTestId('selected-operator').innerHTML.trim()).toEqual('+');
    expect(addButton.nativeElement.textContent.trim()).toBe("+");
    expect(minusButton.nativeElement.textContent.trim()).toBe("-");
    expect(mulButton.nativeElement.textContent.trim()).toBe("*");
    expect(divButton.nativeElement.textContent.trim()).toBe("/");
    expect(resetButton.nativeElement.textContent.trim()).toBe("Reset");
    expect(getByTestId('total-operations').innerHTML.trim()).toEqual('Total operations performed: 0');
  });

  it('Should be able to add the numbers', async () => {
    pushValue(inp1, 2);
    pushValue(inp2, 3);
    addButton.nativeElement.click();
    await fixture.whenStable();
    const result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 5');
    expect(getByTestId('selected-operator').innerHTML.trim()).toEqual('+');
  });

  it('Should be able to subtract the numbers', async () => {
    pushValue(inp1, 3);
    pushValue(inp2, 2);
    minusButton.nativeElement.click();
    await fixture.whenStable();
    const result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 1');
    expect(getByTestId('selected-operator').innerHTML.trim()).toEqual('-');
  });

  it('Should be able to multiple the numbers', async () => {
    pushValue(inp1, 30);
    pushValue(inp2, 1.5);
    mulButton.nativeElement.click();
    await fixture.whenStable();
    const result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 45');
    expect(getByTestId('selected-operator').innerHTML.trim()).toEqual('*');
  });

  it('Should be able to divide the numbers', async () => {
    pushValue(inp1, 11);
    pushValue(inp2, 22);
    divButton.nativeElement.click();
    await fixture.whenStable();
    const result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 0.5');
    expect(getByTestId('selected-operator').innerHTML.trim()).toEqual('/');
  });

  it('Should maintain the total operation count', async () => {
    pushValue(inp1, 11);
    pushValue(inp2, 22);
    addButton.nativeElement.click();
    minusButton.nativeElement.click();
    mulButton.nativeElement.click();
    divButton.nativeElement.click();
    await fixture.whenStable();

    pushValue(inp1, 45);
    pushValue(inp2, 20);
    addButton.nativeElement.click();
    minusButton.nativeElement.click();
    mulButton.nativeElement.click();
    divButton.nativeElement.click();
    await fixture.whenStable();

    expect(getByTestId('total-operations').innerHTML.trim()).toEqual('Total operations performed: 8');
  });

  it('Should reset the component when reset button is clicked', async () => {
    pushValue(inp1, 30);
    pushValue(inp2, 4.5);
    mulButton.nativeElement.click();
    resetButton.nativeElement.click();
    await fixture.whenStable();

    expect(getByTestId('total-operations').innerHTML.trim()).toEqual('Total operations performed: 1');
    expect(inp1.nativeElement.value).toBeFalsy();
    expect(inp2.nativeElement.value).toBeFalsy();
  });

  it('Should implement the sequence of operations', async() => {
    let result;
    pushValue(inp1, 30);
    pushValue(inp2, 4.5);
    addButton.nativeElement.click();
    fixture.detectChanges();

    result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 34.5');
    minusButton.nativeElement.click();
    fixture.detectChanges();

    result = getByTestId('result');
    expect(result).toBeTruthy();
    expect(result.innerHTML.trim()).toEqual('Result: 25.5');
  });

});

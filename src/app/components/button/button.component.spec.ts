import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', (): void => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();

    const icon = fixture.nativeElement.querySelector('fa-icon');
    expect(icon).toBeFalsy();

    const tooltip = fixture.nativeElement.querySelector('span');
    expect(tooltip).toBeFalsy();
  });

  it('should disable the button if disabled input is true', (): void => {
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should display tooltip on hover', (): void => {
    component.tooltip = 'tooltip';

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.relative');

    button.dispatchEvent(new Event('mouseenter'));

    fixture.detectChanges();

    const tooltip = fixture.nativeElement.querySelector('span');

    expect(tooltip).toBeTruthy();
    expect(tooltip.textContent).toContain('tooltip');

    button.dispatchEvent(new Event('mouseleave'));

    fixture.detectChanges();

    const tooltipAfterMouseLeave =
      fixture.nativeElement.querySelector('.absolute');

    expect(tooltipAfterMouseLeave).toHaveClass('hidden');
  });

  it('should have fa icon', (): void => {
    component.icon = faMagic;

    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector('fa-icon');

    expect(icon).toBeTruthy();
  });
});

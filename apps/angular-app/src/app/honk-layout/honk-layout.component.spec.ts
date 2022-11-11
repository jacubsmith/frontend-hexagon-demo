import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HonkLayoutComponent } from './honk-layout.component';

describe('HonkLayoutComponent', () => {
	let component: HonkLayoutComponent;
	let fixture: ComponentFixture<HonkLayoutComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HonkLayoutComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HonkLayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

"use strict";
import util from '../../../public/util/util';
import {assert} from 'chai';
describe('test util.js', ()=>{
	it('test isMorning', ()=>{
		assert.equal(util.isMorning("10:00am"), true);
	})
});
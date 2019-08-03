import { shallow } from 'enzyme';

describe('Health test', () => {
	it('Should works without problems', () => {
		expect(2).toBe(2);
	});

	it('Should tests components properly', () => {
		const Component = () => <h1>Hello</h1>
		const wrapper = shallow(<Component />);
		expect(wrapper.find('h1')).toHaveLength(1);
	});
});

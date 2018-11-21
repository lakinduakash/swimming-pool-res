import {UserSignInUpModule} from './user-signin-up.module';


describe('EvalSignInUpModule', () => {
  let evalSigninUpModule: UserSignInUpModule;

  beforeEach(() => {
    evalSigninUpModule = new UserSignInUpModule();
  });

  it('should create an instance', () => {
    expect(evalSigninUpModule).toBeTruthy();
  });
});

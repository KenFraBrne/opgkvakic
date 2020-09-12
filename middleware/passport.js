import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('users')
    .findOne({ _id: id })
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  }, async (req, email, password, done) => {
    const user = await req.db.collection('users').findOne({ email });
    const passOK = user && await bcrypt.compare(password, user.password);
    if (passOK){
      done(null, user);
    } else {
      done(null, false, { message: 'Email or password are incorrect' });
    }
  })
);

export default passport;

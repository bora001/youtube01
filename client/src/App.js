import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import auth from './hoc/auth'
import UploadPage from './components/views/UploadPage/UploadPage'
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './components/views/LandingPage/SubscriptionPage/SubscriptionPage';
function App() {
  
  return (
      <Router>
          <div>
            <Switch>
              <Route exact path="/" component={auth(LandingPage, null, true)} />
              <Route exact path="/login" component={auth(LoginPage, false)} />
              <Route exact path="/register" component={auth(RegisterPage, false)} />
              <Route exact path="/uploads" component={auth(UploadPage, true)} />
              <Route exact path="/video/:videoId" component={auth(VideoDetailPage, null)} />
              <Route exact path="/subscription" component={auth(SubscriptionPage, null)} />
            </Switch>
          </div>
      </Router>
  );
}

export default App;

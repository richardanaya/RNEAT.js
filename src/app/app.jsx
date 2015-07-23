(function () {
  let Main = require('./components/main.jsx');
  let Network = require('./components/network.jsx');

  var routes =
    <ReactRouter.Route handler={Main}>
      <ReactRouter.Route path="/" handler={Network}/>
    </ReactRouter.Route>

  ReactRouter.run(routes, ReactRouter.HashLocation, (Root) => {
    React.render(<Root />, document.body);
  });
})();

import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import clsx from 'clsx';

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.tokenClose);
    PubSub.unsubscribe(this.tokenRoute);
  }
  componentDidMount() {
    this.tokenRoute = PubSub.subscribe('ROUTE_UPDATE', (e, d) => {
      // console.log(e)
      this.setState({
        active: false,
      });
      PubSub.publish('BURGER', false);
    });

    this.tokenClose = PubSub.subscribe('BURGER.CLOSE', (e, d) => {
      this.setState(
        {
          active: false,
        },
        () => {
          PubSub.publish('BURGER', this.state.active);
        }
      );
    });
  }

  _onClick() {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        // console.log(this.state)
        PubSub.publish('BURGER', this.state.active);
      }
    );
  }

  render() {
    const { active } = this.state;
    const burgerClass = active ? 'is-active' : '';
    return (
      <div className="fixed z-20 top-0 right-0 w-full pt-md ">
        <div className="container">
          <div className="flex justify-end">
            <div
              className={clsx('burger-wrapper pointer-events-auto', burgerClass)}
              onClick={() => this._onClick()}
              onKeyDown={() => this._onClick()}
              role="button"
              tabIndex={0}
              aria-label="toggle menu"
            >
              <div className="burger">
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Burger;

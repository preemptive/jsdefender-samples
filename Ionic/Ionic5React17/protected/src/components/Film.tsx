import { Component } from 'react';
import { getFilmData } from "../util/provider";

type MyState = {
  loader: Boolean,
  result: Array<[]>
};

class Film extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      loader: true,
      result: []
    };
  }

  /**
   * on component mount fetch list of planets from SWAPI
   */
  componentDidMount = () => {
    this.getResult();
  }
  
  /**
   * this method is used to fetch the list of planets
   */
  getResult = () => {
    this.setState({ loader: true });

    getFilmData()
      .then((resp) => this.apiSuccessCallback(resp))
      .catch(() => this.apiFailureCallback());
  }

  /**
   * this method is planets api success callback, set the data into state
   */
  apiSuccessCallback = (resp: any) => {
    let data = resp.data.results;

    this.setState({
      result: data,
      loader: false,
    });
  }

  /**
   * this method is planets api failure callback, shows error
   */
  apiFailureCallback = () => {
    this.setState({ loader: false });
    alert("Something went wrong!!");
  }

  render() {
    let loader = null;
    if (this.state.loader) {
      loader = <div>
        <div className="loader"></div>
        <div id="overlay"></div>
      </div>;
    } else {
      loader = null;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          {this.state.result.map((item: any, i: any) => {
              return(
                <div className="response" key={i}>
                  <p className="card-title">{item.name}</p>
                  <table className="table table-borderless table-responsive">
                    <tbody>
                      <tr className="card-heading-1">
                        <td>Title</td>
                        <td>Director</td>
                        <td>Producer</td>
                        <td>Release date</td>
                      </tr>
                      <tr className="card-heading-2">
                        <td>{item.title}</td>
                        <td>{item.director}</td>
                        <td>{item.producer}</td>
                        <td>{item.release_date}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
          })}
        </div>
        {loader}
      </div>
    );
  }
};

export default Film;

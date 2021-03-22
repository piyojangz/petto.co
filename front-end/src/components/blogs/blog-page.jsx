import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Siteurl } from "../../services/script";
class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentlist: [],
    };
  }

  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color15.css`);

    this.getcontentlist();
  }

  getcontentlist = () => {
    fetch(Siteurl + "service/getcontentlist", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ limit: 99 }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ contentlist: result.result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    return (
      <div>
        <Breadcrumb title={"บทความ"} />
        <section className="section-b-space  blog-page">
          <div className="container">
            {this.state.contentlist.map((row, index) => {
              return (
                <div key={"div-" + index}>
                  <div className="col-md-12">
                    <Link
                      to={`${process.env.PUBLIC_URL}/blog/details/${row.id}`}
                    >
                      <div className="classic-effect">
                        <img
                          style={{ width: "100%" }}
                          src={`${row.image}`}
                          className="img"
                          alt=""
                        />
                        <span />
                      </div>
                    </Link>
                    <div className="blog-details">
                      <h4>{`${row.createdate}`}</h4>
                      <Link to={`${process.env.PUBLIC_URL}/blog/details`}>
                        <p>{`${row.title}`}</p>
                      </Link>
                      <hr className="style1" />
                      {/*   <h6>by: John Dio , 2 Comment</h6> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps)(BlogPage);

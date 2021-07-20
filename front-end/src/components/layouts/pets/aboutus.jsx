import React, { Component } from "react";
import Breadcrumb from "../../common/breadcrumb";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Siteurl } from "../../../services/script";
class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    document
      .getElementById("color")
      .setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/color15.css`);

    this.getcontent();
  }

  getcontent = () => {
    fetch(Siteurl + "service/getaboutus", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ content: result.result.description });
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
        <Breadcrumb title={"เกี่ยวกับเรา"} />
        <section className="section-b-space  blog-page">
          <div className="container">
            <div
              class="col-12"
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

export default connect(mapStateToProps)(Aboutus);

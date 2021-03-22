import React, { Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import { Siteurl } from "../../services/script";
class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        title: "",
      },
    };
  }

  componentDidMount() {
    this.getcontentbyid(this.props.contentId);
  }

  getcontentbyid = (contentId) => {
    fetch(Siteurl + "service/getcontentbyid", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ id: contentId }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ content: result.result });
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
    let content = this.state.content;
    console.log(content);
    return (
      <div>
        <Breadcrumb title={`บทความ - ${content.title}`} />

        {/*Blog Details section*/}
        <section className="blog-detail-page section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 blog-detail">
                <div className="text-center">
                  <img src={`${content.image}`} className="img-fluid" alt="" />
                </div>
                <h3>{content.title}</h3>
                <ul className="post-social">
                  <li>{content.createdate}</li>
                </ul>
                <div class="row">
                  <div
                    class="col-12"
                    dangerouslySetInnerHTML={{ __html: content.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let contentId = ownProps.match.params.id;
  return {
    symbol: state.data.symbol,
    contentId: contentId,
  };
};

export default connect(mapStateToProps)(BlogDetails);

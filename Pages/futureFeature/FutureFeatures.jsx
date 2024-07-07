import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./FutureFeature.scss";

function FutureFeatures() {
  const features = [
    {
      title: "Enhanced User Experience",
      description:
        "We are working on improving the overall user interface to make it more intuitive and user-friendly.",
    },
    {
      title: "New Integrations",
      description:
        "Integration with popular third-party services to provide a seamless experience.",
    },
    {
      title: "Advanced Analytics",
      description:
        "We plan to include advanced analytics to help you gain deeper insights into your data.",
    },
    {
      title: "Mobile Application",
      description:
        "A mobile version of our application to help you stay connected on the go.",
    },
    {
      title: "Improved Security",
      description:
        "Additional security features to ensure your data is safe and secure.",
    },
    {
      title: "Sharing Notes",
      description: "Allow users to share their notes with others.",
    },
    {
      title: "Collaboration",
      description: "Enable real-time collaboration on the same canvas.",
    },
    {
      title: "Advanced Formatting",
      description: "Support rich text formatting within notes.",
    },
    {
      title: "Export Options",
      description: "Provide options to export notes as PDFs or images.",
    },
  ];

  return (
    <div className="container py-4">
      <h1 className="display-4 mb-4 text-center">Future Features</h1>
      <p className="lead text-center mb-5">
        We are constantly working to improve our application. Here are some
        exciting features that we have planned for the future:
      </p>

      <div className="row">
        {features.map((feature, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {index + 1}. {feature.title}
                </h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="lead text-center mt-5">
        Stay tuned for these updates and more!
      </p>
    </div>
  );
}

export default FutureFeatures;

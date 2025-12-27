const aboutUsData = (req, res) => {
  res.status(200).json({
    message: "Fetching About Us data",
    data: {
      companyName: "Auction House Inc.",
      established: "2020",
      mission: "To provide a seamless and efficient auction experience for all users."
    }
  });
}

const goalsData = (req, res) => {
  res.status(200).json({
    message: "Fetching our goals",
    data: [
      "Enhance user satisfaction",
      "Expand our market reach",
      "Innovate with new features",
      "Ensure secure transactions"
    ]
  });
}

const pricingData = (req, res) => {
  res.status(200).json({
    message: "Fetching pricing details",
    data: {
      basicPlan: {
        price: "$10/month",
        features: ["Basic auction listing", "Standard support"]
      },
      premiumPlan: {
        price: "$30/month",
        features: ["Premium auction listing", "Priority support", "Advanced analytics"]
      },
      enterprisePlan: {
        price: "Contact us for pricing",
        features: ["Custom solutions", "Dedicated support", "Custom analytics"]
      }
    }
  });
}

const membersData = (req, res) => {
  res.status(200).json({
    message: "Fetching team members data",
    data: [
      {
        id: 1,
        name: "John Doe",
        role: "CEO",
        bio: "John has over 20 years of experience in the auction industry."
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "CTO",
        bio: "Jane is a tech enthusiast with a passion for developing scalable auction platforms."
      },
      {
        id: 3,
        name: "Emily Johnson",
        role: "COO",
        bio: "Emily ensures our operations run smoothly and efficiently."
      }
    ]
  });
}

module.exports = {
  aboutUsData, goalsData, pricingData, membersData
}
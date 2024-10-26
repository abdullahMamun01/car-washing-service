import { CarwashModel } from '../carWashService/carWashService.models';
import { PaymentModel } from '../payment/payment.mode';
import UserModel from '../user/user.model';
const monthNames = [
  "" ,
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];


const serviceAnalyticOverViewFromDB = async () => {
  const totalUser = (await UserModel.find({ role: 'user' }).lean()).length;
  const totalService = (await CarwashModel.find({isDeleted: false}).lean()).length;
  const totalRevenue = await PaymentModel.aggregate([
    {
      $lookup: {
        from: 'carwashservices',
        localField: 'service',
        foreignField: '_id',
        as: 'serviceDetails',
      },
    },
    {
      $unwind: '$serviceDetails',
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$serviceDetails.price',
        },
      },
    },
  ]);

  return {
    totalRevenue : totalRevenue[0].totalRevenue ,
    totalUser ,
    totalService
  }
};


const profitAnalyticFromDB = async () => {
  const profitAnalytics = await PaymentModel.aggregate([
    {
      $lookup: {
        from: 'carwashservices',
        localField: 'service',
        foreignField: '_id',
        as: 'serviceDetails',
      },
    },
    {
      $unwind: '$serviceDetails',
    },
    {
      $group: {
        _id: {
          month: { $month: '$paymentDate' },    // Group by month
          year: { $year: '$paymentDate' },      // Group by year
          serviceName: "$serviceDetails.name",  // Group by service name
        },
        monthlyRevenue: { $sum: "$serviceDetails.price" },  // Total amount per month
      },
    },
    {
      $group: {
        _id: {
          year: "$_id.year",
          serviceName: "$_id.serviceName",
        },
        yearlyRevenue: { $sum: "$monthlyRevenue" },
        monthlyRevenues: {
          $push: {
            month: "$_id.month",
            monthlyTotal: "$monthlyRevenue",
          },
        },
      },
    },
  ]);

  const yearlyRevenueSummary = profitAnalytics.map(data => ({
    year: data._id.year,
    [data._id.serviceName]: data.yearlyRevenue,
  }));

  const monthlyRevenueSummary = profitAnalytics.map(data => ({
    month: monthNames[data.monthlyRevenues[0].month],
    [data._id.serviceName]: data.monthlyRevenues[0].monthlyTotal,
  }));

  return {
    monthlyRevenueData: monthlyRevenueSummary,
    yearlyRevenueData: yearlyRevenueSummary,
  };
}

export const analyticService = {
  serviceAnalyticOverViewFromDB,
  profitAnalyticFromDB
};



/* 
[
    { month: "Sep", ProductOne: 23, ProductTwo: 30 },

]


*/
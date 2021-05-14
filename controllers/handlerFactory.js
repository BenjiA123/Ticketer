const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')


exports.getAll = Model => catchAsync(async (req,res,next)=>{
    const doc = await Model.find()
  
    res.status(200).json({
      status:'success',
      doc
    })
  })
  
  exports.createOne = Model => catchAsync(async (req,res,next)=>{
  
    const doc = await Model.create(req.body)
  
    res.status(200).json({
      status:'success',
      doc
    })
  
  })
  
  exports.updateOne = Model => catchAsync(async (req,res,next)=>{
  
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // Permits validators for updateBooking
      runValidators: false,
    });
    if (!doc) {
      return next(new AppError(`No document Found this with ID`, 404));
    }
    res.status(200).json({
      status:'success',
      doc
    })
  
  })
  
  exports.deleteMany = Model => catchAsync(async (req,res,next)=>{
  
    const doc = await Model.deleteMany()
  
    res.status(204).json({
      status:'success',
     
    })
  
  })

  exports.deleteOne = Model => catchAsync(async(req,res,next)=>{

    await Model.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"success",

    })


  })
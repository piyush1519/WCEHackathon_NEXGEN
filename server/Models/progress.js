 import mongoose from 'mongoose';


const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users',
      required: true,
      index: true,
    },
    levels: {
      type: [
        {
          level: { type: Number, required: true },
          modules: [
            {
              moduleId: { type: Number, required: true },
              value: { type: Number, required: true, default: 0, min: 0, max: 100 },
              completed: { type: Boolean, required: true, default: false },
            },
          ],
          completed: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
    totalProgress: { type: Number, default: 0, min: 0, max: 100 },
    history: [
      {
        date: { type: Date, default: Date.now },
        changes: String,
      },
    ],
  },
  { timestamps: true }
);


progressSchema.index({ userId: 1, 'levels.level': 1 }, { unique: true });

progressSchema.pre('save', function (next) {
  this.levels.forEach(level => {
    if (level.modules && level.modules.length > 0) {
      level.completed = level.modules.every(module => module.completed);
    } else {
      level.completed = false; 
    }
  });

  const totalModules = this.levels.reduce((count, level) => count + (level.modules?.length || 0), 0);
  const totalValue = this.levels.reduce(
    (sum, level) =>
      sum + level.modules.reduce((moduleSum, module) => moduleSum + module.value, 0),
    0
  );

  this.totalProgress = totalModules > 0 ? totalValue / totalModules : 0;

  next();
});

progressSchema.methods.findLevelProgress = function (levelNumber) {
  return this.levels.find(level => level.level === levelNumber);
};

progressSchema.statics.findByUserId = async function (userId) {
  return this.findOne({ userId }).populate('userId'); 
};

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;

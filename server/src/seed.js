import "dotenv/config";
import connectDb from "./config/db.js";
import MenuItem from "./models/MenuItem.js";
import Admin from "./models/Admin.js";
import seedMenu from "./data/seedMenu.js";

const run = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);

    // Seed menu items
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(seedMenu);
    console.log("✓ Seeded menu items.");

    // Create default admin user if it doesn't exist
    const adminExists = await Admin.findOne({ username: "admin" });
    if (!adminExists) {
      await Admin.create({
        username: "admin",
        passwordHash: "admin123", // Will be hashed by pre-save hook
        isActive: true
      });
      console.log("✓ Created default admin user (username: admin, password: admin123)");
      console.log("⚠️  IMPORTANT: Change the default password immediately!");
    } else {
      console.log("ℹ️  Admin user already exists.");
    }

    console.log("\n✓ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  }
};

run();

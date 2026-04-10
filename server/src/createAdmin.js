import "dotenv/config";
import connectDb from "./config/db.js";
import Admin from "./models/Admin.js";

const createAdmin = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);

    const args = process.argv.slice(2);

    if (args.length < 2) {
      console.log("\n📝 Usage: node src/createAdmin.js <username> <password>\n");
      console.log("Example: node src/createAdmin.js admin123 MySecurePassword456!\n");
      process.exit(1);
    }

    const [username, password] = args;

    if (username.length < 3) {
      console.error("❌ Username must be at least 3 characters long");
      process.exit(1);
    }

    if (password.length < 8) {
      console.error("❌ Password must be at least 8 characters long");
      process.exit(1);
    }

    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.error(`❌ Admin user '${username}' already exists`);
      process.exit(1);
    }

    // Create new admin
    const admin = await Admin.create({
      username,
      passwordHash: password,
      isActive: true
    });

    console.log("\n✅ Admin user created successfully!\n");
    console.log(`   Username: ${admin.username}`);
    console.log(`   ID: ${admin._id}`);
    console.log(`   Created: ${admin.createdAt}\n`);
    console.log("💡 Use these credentials to log into the admin panel.\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdmin();

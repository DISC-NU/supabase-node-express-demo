const supabase = require("../config/supabase");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const { data, error } = await supabase.from("users").select("*");

      if (error) throw error;
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return res.status(404).json({ message: "User not found" });
        }
        throw error;
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

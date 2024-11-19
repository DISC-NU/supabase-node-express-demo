const supabase = require("../config/supabase");

class UserController {
  async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_id", userId)
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const {
        firstName,
        lastName,
        bio,
        major,
        graduation_year,
        profile_picture,
      } = req.body;

      const { data, error } = await supabase
        .from("users")
        .update({
          firstName,
          lastName,
          bio,
          major,
          graduation_year,
          profile_picture,
        })
        .eq("auth_id", userId)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();

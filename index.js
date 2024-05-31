import express from "express";
import translate from "translate";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
translate.engine = "google";
app.post("/translate", async (req, res) => {
  const { content, language } = req.body;

  if (!language) {
    return res.status(400).json({
      error: true,
      message: "Language is required.",
    });
  }

  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Content is required.",
    });
  }

  try {
    const text = await translate(content, { to: language });
    console.log(text);
    return res.json({
      error: false,
      data: text,
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send(`
   <div style="text-align: center; display:flex; margin-top:300px; width:100%;  align-items:center; justify-content: center;   ">
   <div style="text-align: center;">
   <h1>API is LIVE</h1>
   <p>For usage instructions, visit our GitHub repository:</p>
   <a href="https://github.com/arbabhassan1/Translate-API/">GitHub Repository</a>
   <br/>
   <br/>
   <form action="mailto:21011556-184@uog.edu.pk" method="GET">
     <button type="submit">Contact Support</button>
   </form>
 </div>
   </div>
  `);
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: true, message: "API route not found" });
});

const PORT_NO = 8686;
app.listen(PORT_NO, () => {
  console.log("Server is Live on\n http://localhost:" + PORT_NO);
});

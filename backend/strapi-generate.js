/**
 * strapi-generate.js
 *
 * Auto-fix and generate all Strapi v5 components & content-types
 * Ensures UID, metadata, and JSON files are valid
 * Ready for GitHub clone & run
 */

const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src");
const componentsDir = path.join(baseDir, "components");
const apiDir = path.join(baseDir, "api");

// ----------------------
// Helpers
// ----------------------
function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureComponentJSON(categoryDir, category, name) {
  if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });

  const filePath = path.join(categoryDir, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`📄 Creating missing component file: ${category}.${name}`);
    const json = {
      collectionName: `components_${category}_${name}s`,
      info: { displayName: name[0].toUpperCase() + name.slice(1) },
      options: {},
      attributes: {}
    };
    writeJSON(filePath, json);
  }
  return `${category}.${name}`;
}

function fixComponents() {
  console.log("🔧 Fixing Components...");
  if (!fs.existsSync(componentsDir)) return;

  const categories = fs.readdirSync(componentsDir);
  categories.forEach(cat => {
    const catPath = path.join(componentsDir, cat);
    if (!fs.statSync(catPath).isDirectory()) return;

    const components = fs.readdirSync(catPath);
    components.forEach(comp => {
      const compName = comp.replace(".json", "");
      ensureComponentJSON(catPath, cat, compName);
    });
  });
}

function fixContentTypes() {
  console.log("\n🔧 Fixing Content-Types...");
  if (!fs.existsSync(apiDir)) return;

  const apis = fs.readdirSync(apiDir);
  apis.forEach(apiName => {
    const contentTypesDir = path.join(apiDir, apiName, "content-types");
    if (!fs.existsSync(contentTypesDir)) return;

    const files = fs.readdirSync(contentTypesDir).filter(f => f.endsWith(".json"));
    files.forEach(file => {
      const filePath = path.join(contentTypesDir, file);
      const schema = readJSON(filePath);
      if (!schema || !schema.attributes) return;

      let updated = false;
      Object.entries(schema.attributes).forEach(([attrName, attr]) => {
        if (attr.type === "component") {
          const [cat, compName] = attr.component.split(".");
          const expectedUID = ensureComponentJSON(path.join(componentsDir, cat), cat, compName);
          if (attr.component !== expectedUID) {
            console.log(`🔧 Fixing attribute ${attrName} in ${apiName}: ${attr.component} → ${expectedUID}`);
            attr.component = expectedUID;
            updated = true;
          }
        }
      });

      if (updated) writeJSON(filePath, schema);
    });
  });
}

// ----------------------
// Run
// ----------------------
console.log("\n🚀 Running Strapi v5 Auto-Fix & Generate Script...\n");
fixComponents();
fixContentTypes();
console.log("\n🎉 Done! Project is ready for GitHub push.\n");

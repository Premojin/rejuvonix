import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const logoCss = fs.readFileSync(new URL("../app/logo-system.css", import.meta.url), "utf8");

test("shared Rejuvonix headers use the Weight Loss logo scale", () => {
  assert.match(logoCss, /\.site-header \.brand img[\s\S]*?width: 50px !important/);
  assert.match(logoCss, /\.detail-header \.brand img[\s\S]*?width: 50px !important/);
  assert.match(logoCss, /\.eligibility-header \.eligibility-brand img[\s\S]*?width: 50px !important/);
  assert.match(logoCss, /\.site-header \.brand img[\s\S]*?height: auto !important/);
});

test("shared Rejuvonix footers use the Weight Loss logo scale", () => {
  assert.match(logoCss, /\.footer-main \.brand img[\s\S]*?width: 150px !important/);
  assert.match(logoCss, /\.detail-footer-grid \.footer-brand img[\s\S]*?width: 150px !important/);
  assert.match(logoCss, /\.footer-main \.brand img[\s\S]*?height: auto !important/);
});

test("mobile shared logo dimensions remain consistent", () => {
  assert.match(logoCss, /\.detail-header \.brand img[\s\S]*?width: 39px !important/);
  assert.match(logoCss, /\.detail-footer-grid \.footer-brand img[\s\S]*?width: 120px !important/);
});

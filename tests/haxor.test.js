import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Haxor Production Tests", () => {
  it("should load the Haxor homepage and verify key elements", async (context) => {
    const testdriver = TestDriver(context);

    // Provision browser and navigate to the production site
    await testdriver.provision.chrome({ url: "https://haxor.sh" });

    // Assert that the homepage loaded successfully
    const pageLoaded = await testdriver.assert(
      "the Haxor homepage is visible with the headline 'Test and measure your Developer Experience'"
    );
    expect(pageLoaded).toBeTruthy();

    // Verify navigation links are visible
    const navVisible = await testdriver.assert(
      "navigation links such as Overview, Why test?, Docs, and Blog are present in the header"
    );
    expect(navVisible).toBeTruthy();
  });

  it("should navigate to the Why test? page", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://haxor.sh" });

    // Click 'Why test?' link in navigation
    const whyTestLink = await testdriver.find("Why test? navigation link");
    await whyTestLink.click();

    // Assert that the Why test page loaded
    const pageAssert = await testdriver.assert(
      "the Why test page or section is displayed"
    );
    expect(pageAssert).toBeTruthy();
  });
});

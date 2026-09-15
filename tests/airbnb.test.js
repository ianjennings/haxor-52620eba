import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Airbnb Search", () => {
  it("should search for a place in Austin TX for 2 people from September 20 to 24", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://www.airbnb.com/s/Austin--TX/homes" });

    const gotItButton = await testdriver.find("Got it button", { timeout: 10000 }).catch(() => null);
    if (gotItButton) {
      await gotItButton.click();
    }

    const anyWeekButton = await testdriver.find("Any week button");
    await anyWeekButton.click();

    const checkInDate = await testdriver.find("September 20 date in the calendar");
    await checkInDate.click();

    const checkOutDate = await testdriver.find("September 24 date in the calendar");
    await checkOutDate.click();

    const addGuestsButton = await testdriver.find("Add guests field in the search bar");
    await addGuestsButton.click();

    const increaseAdultsButton = await testdriver.find("increase Adults button");
    await increaseAdultsButton.click();
    await increaseAdultsButton.click();

    const searchButton = await testdriver.find("Search button in the search bar");
    await searchButton.click();

    const assertResult = await testdriver.assert("Airbnb search results for Austin TX are displayed for Sep 20 to 24 with 2 guests");
    expect(assertResult).toBeTruthy();
  });
});

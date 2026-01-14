from selenium import webdriver
from selenium.webdriver.common.by import By

def test_burger_menu():
    driver = webdriver.Chrome()
    driver.get("https://www.saucedemo.com/")

    driver.find_element(By.ID, "user-name").send_keys("standard_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()

    driver.find_element(By.ID, "react-burger-menu-btn").click()
    assert driver.find_element(By.ID, "logout_sidebar_link").is_displayed()

    driver.quit()

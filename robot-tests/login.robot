*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}      https://www.saucedemo.com/
${BROWSER}  chrome

*** Test Cases ***
Valid Login With Robot
    Open Browser    ${URL}    ${BROWSER}
    Input Text      id:user-name    standard_user
    Input Text      id:password     secret_sauce
    Click Button    id:login-button
    Page Should Contain    Products
    Close Browser

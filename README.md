# CITY FINANCE

## FAQs

1. How does the re-direction logic works in Questionnaire and 15th FC Grand modules?  
   Ans: When user logged in, we check for key `postLoginNavigation` in `SessionStorage`. If it exists, then
   the user is redirected to that particular page. Otherwise, they are redirected to `/home`.  
   **In case of Questionnaire**, When a User cliccks on the Questionanaire tab, that module internally validates few things (user is logged in or not,user-access, type of user etc). If it is found that user is not logged in, then it set `postLoginNavigation` value to itself.  
   **In case of 15th FC Grant Modules**, the module set the `postLoginNavigation` value to itselgf before redirecting to login page.
   ### NOTE
   This needs to be changed. The implementation done above is not scalable enough to be used in every modules / pages, and not easy to maintain for long term.
